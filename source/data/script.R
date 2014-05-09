# load dependencies
library(XLConnect)
library(sqldf)
library(rjson)

# load data
setwd('~/Sites/bbc/news/special/2014/newsspec_7634/source/data/')
workbook  <- loadWorkbook('top100k_v2.xlsx')
worksheet <- readWorksheet(workbook, sheet = 'Sheet1')
# Define column names
colnames(worksheet) <- c("club", "years", "bmi", "alcohol")

# order data
orderedByBmi     <- sqldf("SELECT * FROM worksheet ORDER BY bmi     ASC")
orderedByAlcohol <- sqldf("SELECT * FROM worksheet ORDER BY alcohol ASC")
orderedByYears   <- sqldf("SELECT * FROM worksheet ORDER BY years   DESC")

# convert to json
jsonBmi     <- toJSON(as.data.frame(t(orderedByBmi)))
jsonAlcohol <- toJSON(as.data.frame(t(orderedByAlcohol)))
jsonYears   <- toJSON(as.data.frame(t(orderedByYears)))

# save manipulated data
write(jsonBmi,     'processed/bmi.json')
write(jsonAlcohol, 'processed/alcohol.json')
write(jsonYears,   'processed/years.json')
