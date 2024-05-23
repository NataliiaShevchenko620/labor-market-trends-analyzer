# Import Dependencies
import pandas as pd
from pathlib import Path
from sqlalchemy import create_engine, text
from flask import Flask
from flask_cors import CORS
import geopandas as gpd

# Connect to database
database_path = Path("data.sqlite")

engine = create_engine(f"sqlite:///{database_path}")

#################################################
# Get GeoJSON data for state and county boundaries
#################################################
states = gpd.read_file("https://www2.census.gov/geo/tiger/GENZ2021/shp/cb_2021_us_state_500k.zip")
counties = gpd.read_file("https://www2.census.gov/geo/tiger/GENZ2021/shp/cb_2021_us_county_500k.zip")

# Keep only main states data
states = states[(states["GEOID"] <= "56")]
counties = counties[(counties["STATEFP"] <= "56")]

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
           f"Available Routes:<br/>"
           f"/api/v1.0/get_states<br/>"
           f"/api/v1.0/get_industries<br/>"
           f"/api/v1.0/get_employment_map/&lt;string:state_code&gt;/lt;int:industry_code&gt;&lt;int:reduction&gt; - return emp map<br/>"
           f"/api/v1.0/get_employment_trend/&lt;string:mertic_code&gt;/lt;int:state_code&gt;&lt;int:industry_code&gt; - return emp trend<br/>"
           f"/api/v1.0/get_unemployment_rate/&lt;string:mertic_code&gt;/lt;int:state_code&gt;&lt;int:industry_code&gt; - return unemp rate<br/>"
           f"/api/v1.0/get_income_map/&lt;string:mertic_code&gt;/lt;int:state_code&gt;&lt;int:industry_code&gt; - return income map<br/>"
    )

@app.route("/api/v1.0/get_states") 
def get_states(): 
    select_statement = f"""
    SELECT state_code,
           state_name
        FROM state
    """
    # print(select_statement) 

    with engine.connect() as connection:
         
        query = text(select_statement)
        result = connection.execute(query)

        result_list = [dict(row) for row in result]
    return jsonify(result_list)

@app.route("/api/v1.0/get_industries") 
def get_industries():
    select_statement = f"""
    SELECT industry_code,
           industry_name
        FROM industry
    """
    print(select_statement) 

    with engine.connect() as connection:
         
        query = text(select_statement)
        result = connection.execute(query)

        result_list = [dict(row) for row in result]
    return jsonify(result_list)
     

    
#################################################
# Run Flask
#################################################

if __name__ == '__main__':
    app.run(debug=True)
