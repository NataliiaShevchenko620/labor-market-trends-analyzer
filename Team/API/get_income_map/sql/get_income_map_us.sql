WITH 
industry_income
AS
(
    SELECT c.state_code,
            SUM(bls_total_annual_wages) AS industry_wage,
            SUM(bls_annual_employment) AS industry_employment
        FROM county_industry_metric cim
                INNER JOIN
                county c ON c.county_fips = cim.county_fips
        WHERE industry_code = 1011
            AND year = (SELECT MAX(year) FROM county_industry_metric)
    GROUP BY c.state_code
),
state_income
AS
(
    SELECT c.state_code,
            SUM(bea_total_income) AS total_income,
            SUM(population) AS population
        FROM county_metric m
                INNER JOIN
                county c ON c.county_fips = m.county_fips
        WHERE m.year = (SELECT MAX(year) FROM county_metric)
    GROUP BY c.state_code
)
SELECT si.state_code,
        si.total_income,
        si.population,
        ii.industry_wage,
        ii.industry_employment
    FROM state_income si
            INNER JOIN
            industry_income ii ON ii.state_code = si.state_code
