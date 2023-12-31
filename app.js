const express = require("express");
const port = process.env.PORT || 3000;
const ejs = require('ejs');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/suppliers/:supplier_id/sites", async (req, res, next) => {
  const { supplier_id } = req.params;

  try {
    const results = await axios.get(`https://interview-apis-7982ee740505.herokuapp.com/suppliers/${supplier_id}/sites`);

    const originalSites = results.data.sites
    const siteInfo = originalSites.filter(site => site.supplier_id === supplier_id);

    const sites = siteInfo.map(site => site.sites[0])
    
      res.status(200).render('sites', {sites});
    } catch (error) {
      next(error);
    }
  }
);

app.get("/sites/:id", async (req, res, next) => {
  const { id } = req.params;
  const { site } = req.query;

  try {
    const results = await axios.get(`https://interview-apis-7982ee740505.herokuapp.com/sites/${id}`);
    const expiryDate = results.data.membership_expiry_date;
    const formattedExpiryDate = new Date(expiryDate).toLocaleDateString("en", {day: "numeric", month: "long", year: "numeric"});
    console.log(formattedExpiryDate)
    const saqs = results.data.saqs;
    const lastUpdatedList = saqs.map(saq => (new Date(saq.last_updated).getTime()));
    const latestSaqDate = (new Date(Math.max(...lastUpdatedList))).getTime();
    const latestSaq = saqs.filter(saq => new Date(saq.last_updated).getTime() === latestSaqDate);
    const latestSaqCompletion = Math.round(latestSaq[0].completion_percent * 10) / 10;

    res.status(200).render('site', {site, expiry: formattedExpiryDate, completion: latestSaqCompletion });
  } catch (error) {
    next(error);
  }
})

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
});

app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});

