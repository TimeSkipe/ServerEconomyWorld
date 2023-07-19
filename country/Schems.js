import mongoose from "mongoose";

const firstGroupIndicatorsSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    uppercase: true,
  },
  Visible:{
    type:String,
  },
  Continent:{
    type:String,
  },
  Region:[
    {
      regionName:String,
      gdp:Number,
      population:Number,
    },
  ],
  Economic:{
    GDPGroup: [
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
    BudgetGroup: [
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
    UnemploymentGroup: [
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
  },
  Social:{
    AverageSalary:Number,
    AverageWorkingHours:Number,
    HappyLevelGroup:Number,
    QualityLifeGroup:Number,
    LiteracyLevel:Number,
    AverageLifeExpectancy:Number,
    PercentageOfPopulationPoverty:Number,
    InfantMortalityRate:Number,
    SocialInequality:Number,
  },
  Politic:{
    FormOfGovernment:String,
    CorruptionGroup:Number,
    GoldReservGroup:Number,
    DemocracyIndex:Number,
    LevelOfPressFreedom:Number,
    InternationalAgreements:[
      {
        organizacionName:String,
      }
    ]
  },
  
  
});

export const FirstGroupIndicators = mongoose.model('FirstGroupIndicators', firstGroupIndicatorsSchema);

