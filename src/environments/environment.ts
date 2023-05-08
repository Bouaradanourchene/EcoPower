// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import stripe from "stripe";

export const environment = {
  production: false,
  ecopowerApiUrl: "http://localhost:9090/checkout",
  stripePublishableKey: "pk_test_51MwbJREgRN5yvejWxFme20f8ZYyOWvGdwOjN63QJuyjqPlcxjElgrmWNqyQjspHQSDLqKAKa6wGGbw2QWHkH0lWt00FRt2Fllp"
};
