type NetlifyLocals = import('@astrojs/netlify').NetlifyLocals;

declare namespace App {
  interface Locals extends NetlifyLocals {
    geo: {
      city?: string;
      country?: {
        code?: string;
        name?: string;
      };
      postalCode?: string;
      subdivision?: {
        code?: string;
        name?: string;
      };
      latitude?: number;
      longitude?: number;
      timezone?: string;
    };
    ip: string;
    requestId: string;
    cookies: Record<string, string>;
    deploy: {
      context: string;
      id: string;
      published: boolean;
    };
  }
}
