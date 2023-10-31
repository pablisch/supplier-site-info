# Project

Suppliers may have more than one site.
Each site has a name, SAQ % and membership expiry.

2 APIs respond with data:
* Listing the sites
* Listing details about one site

Provide two views:
* A list of site names each linked to that sites details
* Details about a individual site


## API endpoint: Get all sites for a supplier
GET /suppliers/:supplier_id/sites

e.g. https://interview-apis-7982ee740505.herokuapp.com/suppliers/ZC100/sites

{
  "supplier_id": "ZC100",
  "sites": [
    {
      "supplier_id": "ZC100",
      "sites": [
        {
          "id": "ZS56789343",
          "name": "Site Postpone-Pen-Network-Impossible-3"
        }
      ]
    },
    {
      "supplier_id": "ZC100",
      "sites": [
        {
          "id": "ZS539424525",
          "name": "Site Pearl-Receipt-Engine-Hear-2"
        }
      ]
    },
    {
      "supplier_id": "ZC1000",
      "sites": [
        {
          "id": "ZS5395453525",
          "name": "Site Resistance-Problem-Way-Rod-9"
        }
      ]
    }
  ]
}

## API endpoint: Get SAQ and membership information for a given site
GET /sites/:site_id

e.g. https://interview-apis-7982ee740505.herokuapp.com/sites/ZS539424525

{
  "id": "ZS539424525",
  "saqs": [
    {
      "completion_percent": 11.303897773368977,
      "last_updated": "2023-09-09T01:03:59.654Z"
    },
    {
      "completion_percent": 21.8090999940435,
      "last_updated": "2023-09-24T04:17:29.117Z"
    }
  ],
  "membership_expiry_date": "2024-11-07"
}

<h4><%= site %></h4>

<p><a href=""><%= site.name %></a></p>