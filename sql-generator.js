export function setup(element) {
  element.addEventListener("click", updateCode);
}

export function updateCode() {
  const tryParseJson = () => {
    try {
      const config = document.querySelector("#config").value;
      return JSON.parse(config);
    } catch (error) {
      console.error(error);
    }
  };

  const getCTEFromSources = (sources, limitPerSource = 10) => {
    return sources.map((source) => {
      return `${source.column}_matches AS (
        SELECT DISTINCT ${source.column} AS hit,
                similarity(${source.column}, :query_string) AS similarity_score,
                '${source.column}' AS match_column
        FROM ${source.table}
        WHERE ${source.column} % :query_string
        ORDER BY similarity_score DESC
        LIMIT ${limitPerSource}
      )`;
    });
  };

  const getSelectAllSqlFromSources = (sources) => {
    return sources.map((source) => {
      return `SELECT * FROM ${source.column}_matches`;
    });
  };

  const { sources, pgTrgmSimilarityThreshold, limitPerSource, totalLimit } =
    tryParseJson();
  console.log(sources);

  const output = document.querySelector("#output");

  output.innerHTML = `
  SET pg_trgm.similarity_threshold = ${pgTrgmSimilarityThreshold};
  WITH ${getCTEFromSources(sources, limitPerSource).join(", ")}
  SELECT hit,
         similarity_score,
         match_column
  FROM (
    ${getSelectAllSqlFromSources(sources).join(" UNION ALL ")}
  ) AS all_matches
  ORDER BY similarity_score DESC
  LIMIT ${totalLimit};
  RESET pg_trgm.similarity_threshold;
  `;
}
