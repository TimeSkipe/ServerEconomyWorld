import mongoose from "mongoose";

const firstGroupIndicatorsSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    uppercase: true,
  },
  GDPGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
  PopulationGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
});

export const FirstGroupIndicators = mongoose.model('FirstGroupIndicators', firstGroupIndicatorsSchema);

const secondGroupIndicatorsSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    uppercase: true,
  },
  BudgetGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
  InflationGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
  UnemploymentGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
  DebtGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
  HappyLevelGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
  QualityLifeGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
  CorruptionGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
  GoldReservGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
  AverageSalaryGroup: [
    {
      year: Number,
      value: Number,
    },
  ],
});

export const SecondGroupIndicators = mongoose.model('SecondGroupIndicators', secondGroupIndicatorsSchema);

const thirdGroupIndicatorsSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    uppercase: true,
  },
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
