# Newsspec-7634

Newsnight football league tables

## Project structure

Data is processed from an Excel file using R (see `source/data`) and stored in `source/data/processed`. The live application does NOT use these JSON files - these are only used in generating index.html through Grunt, so that non JavaScript browsers can still see the core content.

## Updating the data

Open `source/data/data.Rproj` in RStudio.

Edit your working directory, filename, and worksheet name if necessary:

```
setwd('~/Sites/bbc/news/special/2014/newsspec_7634/source/data/')
workbook <- loadWorkbook('top100k.xlsx')
worksheet <- readWorksheet(workbook, sheet = 'raw')
```

Run the script (select all then CMD+ENTER) to overwrite the json files in `source/data/processed/`. You may need to install the necessary packages first.

Then simply run

```
grunt
```

The data you generated in the first steps is used in `source/tmpl/modules/table.tmpl`

## Tweaking the data

You may not have a data update as such, but the way the data is presented might need to be changed. Here are a few of the possible eventualities.

### Changing the ascending/descending order

Simply edit the SQL command in the R script (`source/data/script.R`), changing 'ASC' or 'DESC' as appropriate. As this is a health indicator, I have gone for life expectancy decending but alcohol units/bmi ascending.

### More or fewer decimal places

This is decided within `source/tmpl/modules/table.tmpl`, within the makeTable() function. More or less accuracy can be implemented by editing that line. The full accuracy of 4 decimal places is stored in the JSON.

### Change the number of teams in each league

Edit the parameters passed to the getRowsBetween() function called in `source/tmpl/modules/table.tmpl`. Make sure the total number of teams matches the last parameter passed (to league 2 tables).

NB: `data` seems to have an undefined zero index, so getRowsBetween() starts at 1.

### Gotchas

If the number of teams in the data changes, you will have to change the number in table.tmpl e.g. `league2 = getRowsBetween(70, 88);` otherwise you'll get the error `cannot get property 'years' of undefined`.

## iFrame scaffold

This project was built using the iFrame scaffold v1.2.3

## License
Copyright (c) 2014 BBC