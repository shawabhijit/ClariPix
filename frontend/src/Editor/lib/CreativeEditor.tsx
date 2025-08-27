import CreativeEditorSDK from '@cesdk/cesdk-js';
import type { Configuration } from '@cesdk/cesdk-js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface CreativeEditorProps extends React.HTMLAttributes<HTMLDivElement> {
    config?: Partial<Configuration>;
    configure?: (instance: CreativeEditorSDK) => Promise<void>;
    onInstanceChange?: (instance: CreativeEditorSDK | undefined) => void;
}

export default function CreativeEditor({
    config = undefined,
    configure = undefined,
    onInstanceChange = undefined,
    ...rest
}: CreativeEditorProps) {
    const containerRef = useRef(null);

    // Get license from environment variables
    const getLicense = () => {
        // Check for different environment variable patterns
        if (typeof import.meta !== 'undefined' && import.meta.env) {
            return import.meta.env.VITE_CESDK_LICENSE_KEY ||
                import.meta.env.NEXT_PUBLIC_LICENSE ||
                import.meta.env.REACT_APP_CESDK_LICENSE_KEY;
        }

        // Fallback for SSR or other environments
        if (typeof process !== 'undefined' && process.env) {
            return process.env.VITE_CESDK_LICENSE_KEY ||
                process.env.NEXT_PUBLIC_LICENSE ||
                process.env.REACT_APP_CESDK_LICENSE_KEY;
        }

        return undefined;
    };

    // Merge default config with license key from environment
    const defaultConfig = useMemo<Partial<Configuration>>(() => {
        const license = getLicense();

        console.log('License check:', license ? 'Found' : 'Not found');

        return {
            license,
            // Add other default configuration options here if needed
        };
    }, []);

    // Merge provided config with default config (provided config takes precedence)
    const finalConfig = useMemo(() => ({
        ...defaultConfig,
        ...config,
    }), [defaultConfig, config]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Validate that license key is present
        if (!finalConfig.license) {
            console.error('CreativeEditorSDK: License key is required. Please set VITE_CESDK_LICENSE_KEY, NEXT_PUBLIC_LICENSE, or REACT_APP_CESDK_LICENSE_KEY in your environment variables, or pass it directly in the config prop.');
            console.error('Current license value:', finalConfig.license);
            return;
        }

        let container = containerRef.current;
        let instance: CreativeEditorSDK | null = null;
        let removed = false;

        CreativeEditorSDK.create(container, finalConfig).then(
            async (_instance) => {
                if (removed) {
                    _instance.dispose();
                    return;
                }

                instance = _instance;
                if (configure) {
                    try {
                        await configure(instance);
                    } catch (error) {
                        console.error('Error in configure function:', error);
                    }
                }
                if (onInstanceChange) {
                    onInstanceChange(instance);
                }
            }
        ).catch((error) => {
            console.error('Failed to create CreativeEditorSDK instance:', error);
        });

        const cleanup = () => {
            removed = true;
            instance?.dispose();
            instance = null;
            if (onInstanceChange) {
                onInstanceChange(undefined);
            }
        };

        return cleanup;
    }, [containerRef, finalConfig, configure, onInstanceChange]);

    return <div ref={containerRef} {...rest}></div>;
}

// Properly typed hooks for external use
export const useConfig = <T extends Partial<Configuration>>(
    configFactory: () => T,
    deps: React.DependencyList
): T => {
    return useMemo(configFactory, deps);
};

export const useConfigure = (
    configureFunction: (instance: CreativeEditorSDK) => Promise<void>,
    deps: React.DependencyList
): ((instance: CreativeEditorSDK) => Promise<void>) => {
    return useCallback(configureFunction, deps);
};

export const useCreativeEditor = (): [CreativeEditorSDK | undefined, React.Dispatch<React.SetStateAction<CreativeEditorSDK | undefined>>] => {
    return useState<CreativeEditorSDK | undefined>(undefined);
};

export const useCreativeEditorRef = (): React.MutableRefObject<CreativeEditorSDK | undefined> => {
    return useRef<CreativeEditorSDK | undefined>(undefined);
};