import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  APP_ENV: string;
  URL_MOTOWORK_CONTACPIME: string;
  MOTOWOKR_CONTACPIME_USER: string;
  MOTOWORK_PRODUCT_MS_PROD: string;
  MOTOWORK_PRODUCT_MS_LOCAL: string;
  MOTOWORK_CONTACPIME_APP_ID: number;
  MOTOWOKR_CONTACPIME_PASSWORD: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  APP_ENV: joi.string().required(),
  URL_MOTOWORK_CONTACPIME: joi.string().required(),
  MOTOWOKR_CONTACPIME_USER: joi.string().required(),
  MOTOWORK_PRODUCT_MS_PROD: joi.string().required(),
  MOTOWORK_PRODUCT_MS_LOCAL: joi.string().required(),
  MOTOWORK_CONTACPIME_APP_ID: joi.number().required(),
  MOTOWOKR_CONTACPIME_PASSWORD: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env,
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  app_env: envVars.APP_ENV,
  url_contacpime: envVars.URL_MOTOWORK_CONTACPIME,
  user_contacpime: envVars.MOTOWOKR_CONTACPIME_USER,
  app_id_contacpime: envVars.MOTOWORK_CONTACPIME_APP_ID,
  motowork_product_prod: envVars.MOTOWORK_PRODUCT_MS_PROD,
  password_contacpime: envVars.MOTOWOKR_CONTACPIME_PASSWORD,
  motowork_product_local: envVars.MOTOWORK_PRODUCT_MS_LOCAL,
}