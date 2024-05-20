SELECT year,
        SUM(bls_annual_employment) AS metric
        FROM county_industry_metric
        WHERE industry_code = 1011
GROUP BY year