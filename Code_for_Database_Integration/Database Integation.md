# Group8_Project

## Database Integration

### Database Storage & Integration:

- Database was found on **Kaggle** for [NYC Sales Prices](https://www.kaggle.com/johnshuford/new-york-city-property-sales) for 5 different boroughs for the last 15 years (2003-2018).

- Database was uploaded to **AWS** using **RDS & S3**.

- Tables were created for each borough in **PgAdmin**.

  ![image](https://user-images.githubusercontent.com/84694664/142786450-8155dbf6-7bf0-4c7c-a9a0-1411bc729a98.png)

- **AWS** was connected to **PgAdmin**.

- Data was read from **AWS** into **PgAdmin** tables using **SQLAlchemy** in **CoLab**. 

![image](https://user-images.githubusercontent.com/84694664/142786494-070bec8d-d7c5-4bec-82b8-1010a45878bd.png)

- Data was cleaned as discussed below in _Database Cleaning_ section.

- 2 new tables called _"Sales"_ & _"Address"_ were created in **PgAdmin**

- The cleaned data was pushed into the 2 new tables in **PgAdmin**
![image](https://user-images.githubusercontent.com/84694664/142786759-28f092b7-f095-4236-8063-6f4b7456c556.png)

- The cleaned data in the 2 new tables were joined to create a new table Sales_join_Address
 ![image](https://user-images.githubusercontent.com/84694664/142786855-89a0ff5b-44ac-403b-81d0-42ec8469df3b.png)

### Database Cleaning: 

### A. Selected columns

**Original columns:**
  * Borough, Neighborhood, Building Class Category, Tax Class As Of Final Roll 18/1, Block, Lot, Ease-Ment, Building Class As Of Final Roll 18/1, Address, Apartment Number, Zip Code, Residential Units, Commercial Units, Total Units, Land Square Feet, Gross Square Feet, Year Built, Tax Class At Time of Sale, Building Class At Time Of Sale, Sale Price, Sale Date

**Retained columns:**
  * Borough, Neighborhood, Building Class Category, Address, Zip Code, Gross Square Feet, Sale_Price, Sale_Date
 
**Added columns:**
   * $sqf, Year, Month

### B. Filtering for residential units
  * Identified residential Building Class Categories and filtered commercial rows based on category
  * Attempted to use Residential Units column to filter out rows with < 0 residential units; this column did not exclude non-Residential units effectviely and was dropped
 
### C. Filtering incomplete values
   * Dropped rows where square feet or price were 0

### D. Price Filtering 
  * Although $0 properties were dropped, it was still necessary to identify price outliers which were very low or high for reasons irrelevant to our analysis (i.e. deed transfers, features not available in our dataset i.e. lakefront, renovations)
  * $sqf column was created to compare prices per property; since prices increased over the years and by Borough, quantiles were calculated by Borough and Year; top and bottom 5% were dropped for each group

### E. Pre and Post Price Processing Summary 
Quantiles were not significantly effected by the removal of the top and bottom 5th percentiles; Mean decreased, Standard Deviation decreased significantly. 

![Pre-processing summary](https://github.com/VershaR1791/Group8_Project/blob/8fa30e0728e57e3f200255e60bfe09b5543f3bff/post_processing_$.png)

![Post-Processing summary](https://github.com/VershaR1791/Group8_Project/blob/8fa30e0728e57e3f200255e60bfe09b5543f3bff/post_processing_$.png)

### F. Primary Key
![ERD](https://user-images.githubusercontent.com/84694664/142769288-2ba8d7ae-6b1d-48f4-923e-b94794e682a5.png)

  * Attempted to use address and apartment number as composite primary key (addresses were duplicated often for multi-unit buildings); Populated apartment number columns were insufficient to uniquely identify duplicated addresses
  * Numeric index column was created instead to be primary key

### G. Final Tables
  * Table was placed in two tables with common index: 
     *  Address (columns: Address, Building Class Category, Borough, Neighborhood, Zip Code)
     *  Sale (columns: Gross Square Feet, Sale Price, Sale Date, Year, Month)
