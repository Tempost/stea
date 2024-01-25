import { z } from 'zod';

export const PositionSchema = z.enum(['President','VicePresident','Secretary','Treasurer','AdultMemberAtLarge','JuniorMemberAtLarge','SocialMediaManager','AwardsCoordinator','Points']);

export type PositionType = `${z.infer<typeof PositionSchema>}`

export default PositionSchema;
