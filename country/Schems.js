import mongoose from "mongoose";

const firstGroupIndicatorsSchema = new mongoose.Schema({
  countryCode: String,
  year: Number,
  currentGDP: Number,
  previousGDP: Number,
  population: Number,
});

export const FirstGroupIndicators = mongoose.model('FirstGroupIndicators', firstGroupIndicatorsSchema);

const secondGroupIndicatorsSchema = new mongoose.Schema({
  countryCode: String,
  budgetPercent: Number,
  inflation: Number,
  unemployment: Number,
  debtPercent: Number,
  happyLevel: Number,
  qualityLife: Number,
  corruption: Number,
  goldReserv: Number,
  averageSalary: Number,
});

export const SecondGroupIndicators = mongoose.model('SecondGroupIndicators', secondGroupIndicatorsSchema);

const thirdGroupIndicatorsSchema = new mongoose.Schema({
  countryCode: String,
  importValue: Number,
  exportValue: Number,
  exportPartners: [
    {
      name: String,
      value: Number,
    },
  ],
  importPartners: [
    {
      name: String,
      value: Number,
    },
  ],
});

export const ThirdGroupIndicator = mongoose.model('ThirdGroupIndicator', thirdGroupIndicatorsSchema);
