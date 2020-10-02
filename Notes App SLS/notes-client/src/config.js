const dev = {
    STRIPE_KEY: "pk_test_51HUFv3CGpYEOEA0LOE6XetRow7eeIDw4NtjACdZLNfO3u4bfU8PVmgRPLFxgjvWQijX3hBMLbhCoanjVGXSYRnkk00drgO4jjF",
    s3: {
      REGION: "us-east-2",
      BUCKET: "notes-app-2-api-dev-attachmentsbucket-116bvlto2zr4q"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://kaqdinu6d7.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_sdWx409PR",
      APP_CLIENT_ID: "2998tfeqlck2vco3t02spgnles",
      IDENTITY_POOL_ID: "us-east-2:97b77504-9aff-41b8-bda8-01f701776135"
    }
  };
  
  const prod = {
    STRIPE_KEY: "pk_test_51HUFv3CGpYEOEA0LOE6XetRow7eeIDw4NtjACdZLNfO3u4bfU8PVmgRPLFxgjvWQijX3hBMLbhCoanjVGXSYRnkk00drgO4jjF",
    s3: {
      REGION: "us-east-2",
      BUCKET: "notes-app-2-api-prod-attachmentsbucket-1r5p3bfme8mi6"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://mi9fnv7r42.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_iI0JGNXqM",
      APP_CLIENT_ID: "46ehmkhc5re6ilr9ogkpq16c7q",
      IDENTITY_POOL_ID: "us-east-2:05f1f030-6c4e-4546-9c1d-dbfadb53a86e"
    }
  };
  
  // Default to dev if not set
  const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };