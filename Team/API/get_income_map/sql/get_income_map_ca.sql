WITH 
industry_income
AS
(
        SELECT c.county_name,
                c.state_code,
                bls_total_annual_wages AS industry_wage,
                bls_annual_employment AS industry_employment
        FROM county_industry_metric cim
                INNER JOIN
                county c ON c.county_fips = cim.county_fips
        WHERE industry_code = 1011
                AND year = (SELECT MAX(year) FROM county_metric)
                AND state_code = 'CA'
),
county_income
AS
(
        SELECT c.county_name,
                c.state_code,
                bea_total_income AS total_income,
                population
        FROM county_metric m
                INNER JOIN
                county c ON c.county_fips = m.county_fips
        WHERE m.year = (SELECT MAX(year) FROM county_metric)
                AND state_code = 'CA'
)
SELECT ci.county_name,
        ci.state_code,
        ci.total_income,
        ci.population,
        ii.industry_wage,
        ii.industry_employment
        FROM county_income ci
                INNER JOIN
                industry_income ii ON ii.county_name = ci.county_name
