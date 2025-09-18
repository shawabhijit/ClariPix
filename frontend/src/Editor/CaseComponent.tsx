'use client';

import { initPhotoEditorUIConfig } from './PhotoEditorConfig';
import CreativeEditor, { useConfig, useConfigure } from './lib/CreativeEditor';

const CaseComponent = ({image} : {image: string | null | File}) => {

    if (!image) {
        return <div className="min-h-screen flex items-center justify-center text-gray-500">No image provided</div>;
    }
    const config = useConfig(
        () => ({
            role: 'Adopter',
            baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.58.0/assets',
            theme: 'dark',
            // Don't override license here - let CreativeEditor handle it from environment
            ui: {
                theme: {
                    components: {
                        notification: {
                            color: '#000000',           
                            backgroundColor: '#ffffff',
                        }
                    }
                },
                elements: {
                    blocks: {
                        '//ly.img.ubq/page': {
                            stroke: { show: false },
                            manage: false
                        }
                    },
                    libraries: {
                        replace: {
                            floating: true,
                            autoClose: true
                        },
                        insert: {
                            autoClose: false,
                            floating: false
                        }
                    },
                    navigation: {
                        // title: 'Photo Editor',
                        position: "bottom" as any,
                        action: {
                            export: {
                                show: true,
                                format: ['image/png']
                            },
                        }
                    },
                },
                cropPresetsLibraries: (engine: any) => {
                    const [selectedBlock] = engine.block.findAllSelected();
                    const isPage =
                        selectedBlock != null &&
                        engine.block.getType(selectedBlock) === '//ly.img.ubq/page';

                    if (isPage) return ['ly.img.crop.presets', 'ly.img.page.presets'];

                    return ['ly.img.crop.presets'];
                }
            },
            i18n: {
                en: {
                    'component.fileOperation.exportImage': 'Export Image'
                }
            },
            callbacks: {
                onExport: 'download',
                onUpload: 'local'
            }
        }),
        []
    );

    const configure = useConfigure(async (instance: any) => {
        try {
            // Add default asset sources first
            await instance.addDefaultAssetSources();

            // Add demo asset sources
            await instance.addDemoAssetSources({ sceneMode: 'Design' });

            // Initialize the photo editor UI and create scene
            // This function should handle scene creation internally
            await initPhotoEditorUIConfig(
                instance,
                image as any,
            );

            console.log('Photo editor configured successfully');
        } catch (error) {
            console.error('Error configuring photo editor:', error);
            throw error;
        }
    }, []);

    return (
        <div className="cesdkWrapperStyle h-[100vh] text-black w-[95vw] md:h-[90vh] md:w-[80vw] mx-auto ">
            <CreativeEditor
                className="cesdkStyle h-full w-full"
                style={{
                    // Hide the inspector bar
                    '--ubq-InspectorBar-background': 'var(--ubq-canvas)'
                } as React.CSSProperties}
                config={config}
                configure={configure}
            />
        </div>
    );
};

export default CaseComponent;