'use client';

import { initPhotoEditorUIConfig } from './PhotoEditorConfig';
import CreativeEditor, { useConfig, useConfigure } from './lib/CreativeEditor';

const CaseComponent = () => {
    const config = useConfig(
        () => ({
            role: 'Adopter',
            theme: 'dark',
            // Don't override license here - let CreativeEditor handle it from environment
            ui: {
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
                        title: 'Photo Editor',
                        action: {
                            export: {
                                show: true,
                                format: ['image/png']
                            }
                        }
                    }
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
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=dom-hill-nimElTcTNyY-unsplash.jpg&w=1920'
            );

            console.log('Photo editor configured successfully');
        } catch (error) {
            console.error('Error configuring photo editor:', error);
            throw error;
        }
    }, []);

    return (
        <div className="cesdkWrapperStyle">
            <CreativeEditor
                className="cesdkStyle"
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