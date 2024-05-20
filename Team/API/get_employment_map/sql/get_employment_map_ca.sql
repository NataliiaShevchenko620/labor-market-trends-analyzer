WITH 
industry_employment
AS
(
    SELECT c.county_name,
            c.state_code,
            bls_annual_employment AS industry_employment
        FROM county_industry_metric cim
                INNER JOIN
                county c ON c.county_fips = cim.county_fips
        WHERE industry_code = 1011
            AND year = (SELECT MAX(year) FROM county_industry_metric)
            AND state_code = 'CA'
),
county_employment
AS
(
    SELECT c.county_name,
            c.state_code,
            SUM(bls_annual_employment) AS total_employment
        FROM county_industry_metric cim
                INNER JOIN
                county c ON c.county_fips = cim.county_fips
        WHERE year = (SELECT MAX(year) FROM county_industry_metric)
            AND state_code = 'CA'
    GROUP BY c.county_name, c.state_code
)
SELECT ce.county_name,
        ce.state_code,
        ce.total_employment,
        ie.industry_employment
    FROM county_employment ce
            INNER JOIN
            industry_employment ie ON ie.county_name = ce.county_name
