# PG Fuzzy Search SQL Generator

This small app's purpose is to allow Hajk administrators to preview the SQL that Hajk will generate, given a certain JS object as configuration. 

The fuzzy search is an [upcoming feature](https://github.com/hajkmap/Hajk/blob/v4/main/apps/backend/server/apis/v3/services/search.service.ts) that will be released in Hajk V4's API and accessible via a `POST` request to the `/api/v3/search/autocomplete` endpoint. 

The `POST` request will require a configuration object, supplied as `BODY` `application/json`. The configuration could look something like this:

```json
  {
  "pgTrgmSimilarityThreshold": 0.2,
  "limitPerSource": 5,
  "totalLimit": 20,
  "sources": [
    { "table": "adresspunkter", "column": "fastighet" },
    { "table": "adresspunkter", "column": "kommundel" },
    { "table": "adresspunkter", "column": "beladress" }
  ]
}

```

Given this input, the backend will generatate appropiate SQL to query the specificed tables and columns in your PostgreSQL database.

During development, I figured it's handy to quickly preview the SQL, ready for use in `psql` or your DB client of choice, hence I created this small utility. 
