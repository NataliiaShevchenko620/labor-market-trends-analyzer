WITH 
industry_employment
AS
(
    SELECT c.state_code,
            SUM(bls_annual_employment) AS industry_employment
        FROM county_industry_metric cim
                INNER JOIN
                county c ON c.county_fips = cim.county_fips
        WHERE industry_code = 1011
            AND year = (SELECT MAX(year) FROM county_industry_metric)
    GROUP BY c.state_code
),
state_employment
AS
(
    SELECT c.state_code,
            SUM(bls_annual_employment) AS total_employment
        FROM county_industry_metric cim
                INNER JOIN
                county c ON c.county_fips = cim.county_fips
        WHERE year = (SELECT MAX(year) FROM county_industry_metric)
    GROUP BY c.state_code
)
SELECT se.state_code,
        se.total_employment,
        ie.industry_employment
    FROM state_employment se
            INNER JOIN
            industry_employment ie ON ie.state_code = se.state_code