WITH 
industry_employment
AS
(
        SELECT s.state_name,
                SUM(bls_annual_employment) AS industry_employment
        FROM county_industry_metric cim
                INNER JOIN
                county c ON c.county_fips = cim.county_fips
                INNER JOIN
                state s ON s.state_code = c.state_code
        WHERE industry_code = 1011
                AND year = (SELECT MAX(year) FROM county_industry_metric)
        GROUP BY s.state_name
),
state_employment
AS
(
        SELECT s.state_name,
                SUM(bls_labor_force) AS labor_force,
                SUM(bls_employed) AS employment
        FROM county_metric m
                INNER JOIN
                county c ON c.county_fips = m.county_fips
                INNER JOIN
                state s ON s.state_code = c.state_code
        WHERE m.year = (SELECT MAX(year) FROM county_metric)
        GROUP BY s.state_name
)
SELECT se.state_name AS area_name,
        se.labor_force,
        se.employment,
        ie.industry_employment
        FROM state_employment se
                INNER JOIN
                industry_employment ie ON ie.state_name = se.state_name
