WITH 
industry_employment
AS
(
        SELECT c.county_name,
                bls_annual_employment AS industry_employment
        FROM county_industry_metric cim
                INNER JOIN
                county c ON c.county_fips = cim.county_fips
        WHERE industry_code = 1011
                AND year = (SELECT MAX(year) FROM county_metric)
                AND state_code = 'CA'
),
county_employment
AS
(
        SELECT c.county_name,
                bls_labor_force AS labor_force,
                bls_employed AS employment
        FROM county_metric m
                INNER JOIN
                county c ON c.county_fips = m.county_fips
        WHERE m.year = (SELECT MAX(year) FROM county_metric)
                AND state_code = 'CA'
)
SELECT ce.county_name AS area_name,
        ce.labor_force,
        ce.employment,
        ie.industry_employment
        FROM county_employment ce
                INNER JOIN
                industry_employment ie ON ie.county_name = ce.county_name
