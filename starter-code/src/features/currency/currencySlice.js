import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch the converted amount from the Frankfurter API
export const fetchExchangeRate = createAsyncThunk(
  "currency/fetchExchangeRate",
  async ({ amount, fromCurrency, toCurrency }, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
        { signal },
      );

      if (!res.ok) throw new Error("Failed to fetch exchange rate");

      const data = await res.json();
      const convertedValue = data.rates?.[toCurrency];

      if (convertedValue == null) throw new Error("Currency rate not found");

      return {
        convertedAmount: convertedValue,
        rate: convertedValue / Number(amount),
      };
    } catch (error) {
      if (error.name === "AbortError") {
        return rejectWithValue("aborted");
      }
      return rejectWithValue(error.message);
    }
  },
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    amount: 1000,
    fromCurrency: "USD",
    toCurrency: "EUR",
    convertedAmount: null,
    rate: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setFromCurrency(state, action) {
      state.fromCurrency = action.payload;
    },
    setToCurrency(state, action) {
      state.toCurrency = action.payload;
    },
    handleSwap(state) {
      const temp = state.fromCurrency;
      state.fromCurrency = state.toCurrency;
      state.toCurrency = temp;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExchangeRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.convertedAmount = action.payload.convertedAmount;
        state.rate = action.payload.rate;
      })
      .addCase(fetchExchangeRate.rejected, (state, action) => {
        if (action.payload === "aborted") {
          // Silently ignore aborted requests, same as your original catch block
          return;
        }
        state.status = "failed";
        state.convertedAmount = null;
        state.rate = null;
        state.error = action.payload;
      });
  },
});

export const { setAmount, setFromCurrency, setToCurrency, handleSwap } =
  currencySlice.actions;
export default currencySlice.reducer;
