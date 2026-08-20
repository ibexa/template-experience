import { ReactNode } from 'react';
type RenderSubject = (subject: string | null | undefined) => ReactNode;
declare const useRenderSubject: (defaultValue?: string) => RenderSubject;
export default useRenderSubject;
