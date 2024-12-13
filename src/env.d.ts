/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
//src/env.d.ts
type NetlifyLocals = import('@astrojs/netlify').NetlifyLocals

declare namespace App {
  interface Locals extends NetlifyLocals {
    city: string;
    country: string;
    weather: {
      temp: number;
      description: string;
    };
  }

}