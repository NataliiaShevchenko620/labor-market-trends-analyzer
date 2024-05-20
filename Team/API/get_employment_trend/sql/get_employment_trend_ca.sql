SELECT m.year,
        SUM(bls_annual_employment) AS metric
        FROM county_industry_metric m
        INNER JOIN
        county c ON c.county_fips = m.county_fips
        WHERE c.state_code = 'CA'
        AND industry_code = 1011
GROUP BY m.year