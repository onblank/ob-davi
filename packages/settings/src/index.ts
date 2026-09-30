import { z } from 'zod';

export const AppSettingsSchema = z.object({
  language: z.string().default('system'),
  locale: z.string().default('system'),
  theme: z.enum(['system', 'light', 'dark']).default('system'),
  recentProjectLimit: z.number().int().min(1).max(100).default(12),
  confirmMediumConfidencePdf: z.boolean().default(true)
});

export type AppSettings = z.infer<typeof AppSettingsSchema>;
export const defaultAppSettings: AppSettings = AppSettingsSchema.parse({});
