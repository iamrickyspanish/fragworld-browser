const Router = require("@koa/router");

const { getConfigs, getConfig, updateConfig, createConfig, destroyConfig } = require("./handlers");

const router = new Router({
  prefix: "/filter-configs"
});

router.post("/", createConfig);
router.get("/", getConfigs);
router.get("/:id", getConfig);
router.patch("/:id", updateConfig);
router.del("/:id", destroyConfig);

module.exports = router;
