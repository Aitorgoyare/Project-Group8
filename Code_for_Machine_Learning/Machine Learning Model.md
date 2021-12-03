# Choosing A Machine Learning Model

## Supervised Machine Learning

###
For our project, we want to be able to predict unit selling price for residential properties in New York City.  We have 15 years of sales data for the five boroughs in NYC.  
We will be using the first 80% of sales data to train our model and the subsequent 20% to test our machine learning model.  As **Supervised Learning** deals with 
labeled data this will be the primary model we will use.  

We will be using a regression model as the target output are continuous variables (sale price). The classification model would not be an appropriate choice as it can only be used to predict discrete outcomes. Logistic regression would also not be appropriate as its outcomes are binary. Support Vector Machine (SVM) would also not be able to generate the desired output for our project as it too produces a binary output.  

In order to confirm that the linear regression model is most accurate in predicting the target outcome, we testing the following models:

  1) Linear Regression 
  2) Robust Regression 
  3) Ridge Regression 
  4) Lasso Regression 
  5) Elastic Net Regression 
  6) Polynomail Regression 
 
###
Our initial Linear regression model yielded an R2 value of **0.676**.  The R2 value to 0.749 when the Polynomial Regression model was used.
This result was expected as sns.pairplot was used to visualize the relationship between various factors and Sale Price. The visualizations showed that the relationship was
not a straight linear relationship.  

![Machine Learning Outcomes](https://user-images.githubusercontent.com/86161212/143789447-434cdc94-d3e5-4e66-b2df-614664509c10.PNG)

### Cleaning Data for Model
Most data preprocessing was completed in **SQL** using **PgAdmin** including dropping NaN values, removing commercial properties and outliers.  Property sales with a price of under $1,000 also removed as these are typically transfer of property between related parties and do not represent a true property sale.  

Due to the size of the data, we decided to focus our results on **residential units** so we dropping commericial units, sales that had **no square footage** listed and null/NaN values as there was still sufficient data to complete our analysis.

**Label Encoder** and **OneHotEncoder** were were used to encode **"Address"**, **"Building Class Category"** and **"Neighborhood"** in order to use in the machine learning model.  In segment 3 OneHotEncoder was added to the encoded fields to remove any bias from the encoded data.

In order to proceed with building our machine learning model we will complete the following steps:
  1. **Creating the model:**
      To create the model we will be using **Scikit-learn** linear regression module in Pandas: from sklearn.linear_model import LinearRegression
  2. **Train the model:**
      We will define the target variable (Sale_Price) and independent variable(s). We will split the dataset into X and y components, with X being the input data and y the output.
  3. **Create the predictions:**
      Using **y_pred = model.predict(X)** we will generate predictions for the y data and plot the best fit line


[Machine Learning Model.pptx](https://github.com/VershaR1791/Group8_Project/files/7614561/Machine.Learning.Model.pptx)

![Pair_Plots](https://user-images.githubusercontent.com/86161212/143789443-a6ed34da-6def-4566-902b-08c89c1ee192.png)

![Scatter Plot](https://user-images.githubusercontent.com/86161212/143789463-01ded126-804d-4862-81b6-44ec43c20c43.PNG)



