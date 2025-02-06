import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  WeddingInviteResponse: a.model({
    name: a.string(),
    phoneNumber: a.phone(),
    isPlusOne: a.boolean(),
    plusOneName: a.string(),
    isAttending: a.boolean(),
    foodRestrictions: a.string(),
    musicSuggestions: a.string()
  }).authorization(allow => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});