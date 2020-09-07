export interface Geoposition {
  "Version": number,
  "Key": string,
  "Type": string,
  "Rank": number,
  "LocalizedName": string,
  "EnglishName": string,
  "PrimaryPostalCode": string,
  "Region": {
    "ID": string,
    "LocalizedName": string,
    "EnglishName": string
  },
  "Country": {
    "ID": string,
    "LocalizedName": string,
    "EnglishName": string
  },
  "AdministrativeArea": {
    "ID": string,
    "LocalizedName": string,
    "EnglishName": string,
    "Level": 1,
    "LocalizedType": string,
    "EnglishType": string,
    "CountryID": string
  },
  "TimeZone": {
    "Code": string,
    "Name": string,
    "GmtOffset": number,
    "IsDaylightSaving": boolean,
    "NextOffsetChange": string
  },
  "GeoPosition": {
    "Latitude": number,
    "Longitude": number,
    "Elevation": {
      "Metric": {
        "Value": number,
        "Unit": string,
        "UnitType": number
      },
      "Imperial": {
        "Value": number,
        "Unit": string,
        "UnitType": number
      }
    }
  },
  "IsAlias": boolean,
  "ParentCity": {
    "Key": string,
    "LocalizedName": string,
    "EnglishName": string
  },
  "SupplementalAdminAreas": [],
  "DataSets": [
    string,
    string
  ]
}
