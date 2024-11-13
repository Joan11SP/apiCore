import { SetMetadata } from "@nestjs/common";

export const AuthMetaData = (...metadata: string[]) => SetMetadata('role', metadata);
export const SessionState = (...metadata: string[]) => SetMetadata('session', metadata);