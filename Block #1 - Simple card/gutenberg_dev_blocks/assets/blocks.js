(function (blocks, editor, components, i18n) {
    var el = wp.element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;
    var RichText = wp.editor.RichText;
    var BlockControls = wp.editor.BlockControls;
    var AlignmentToolbar = wp.editor.AlignmentToolbar;
    var MediaUpload = wp.editor.MediaUpload;
    var InspectorControls = wp.editor.InspectorControls;
    var TextControl = components.TextControl;


    registerBlockType('gutenberg-dev-blocks/simple-card', {
        title: i18n.__('Simple card'),
        icon: 'welcome-widgets-menus',
        category: 'common',

        // Necessary for saving block content.
        attributes: {
            alignment: {
                type: 'string',
                default: 'center'
            },
            title1: {
                type: 'string',
                selector: 'p',
            },
            title1FontSize: {
                type: 'integer',
                default: '20'
            },
            title2: {
                type: 'string',
                selector: 'p'
            },
            mediaURL: {
                type: 'string',
                default: 'none'
            },
        },

        edit: function (props) {
            var attributes = props.attributes;
            var alignment = props.attributes.alignment;

            return [
                // Configuration elements for control block
                el(BlockControls, {key: 'controls'},
                    // Display controls when the block is clicked on.
                    el(AlignmentToolbar, {
                        value: alignment,
                        onChange: function (newAlignment) {
                            props.setAttributes({alignment: newAlignment})
                        },
                    }),

                    el(MediaUpload, {
                        type: 'image',
                        onSelect: function (media) {
                            props.setAttributes({
                                mediaURL: media.url
                            });
                        },
                        render: function (obj) {
                            return el(components.Button, {
                                    className: 'components-icon-button components-toolbar__control',
                                    onClick: obj.open
                                },
                                // Add Dashicon for media upload button.
                                el('svg', {className: 'dashicon dashicons-edit', width: '20', height: '20'},
                                    el('path', {d: 'M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z'})
                                ))
                        }
                    })
                ),


                // Inspector
                el(InspectorControls, {key: 'inspector'},
                    el(components.PanelBody, {
                            title: i18n.__('Font configuration'),
                            className: 'block-social-links',
                            initialOpen: true
                        },
                        el('div', {},
                            el(TextControl, {
                                type: 'integer',
                                value: attributes.title1FontSize,
                                label: 'Font size "Title 1"',
                                help: 'This field will help change the text size.',
                                onChange: function (newSize) {
                                    props.setAttributes({title1FontSize: newSize});
                                }
                            })
                        )
                    )
                ),

                // Content of block
                el('div', {
                        className: 'wp-block-gutenberg-dev-blocks-simple-card',
                        style: {
                            textAlign: props.attributes.alignment,
                            backgroundImage: "url('" + props.attributes.mediaURL + "')",
                        },
                    },

                    el(RichText, {
                        tagName: 'p',
                        value: attributes.title1,
                        placeholder: 'Title 1',
                        keepPlaceholderOnFocus: true,
                        onChange: function (newContent) {
                            props.setAttributes({title1: newContent});
                        },
                        style: {
                            fontSize: props.attributes.title1FontSize + 'px',
                        },
                    }, attributes.title1),

                    el(RichText, {
                        tagName: 'p',
                        value: attributes.title2,
                        placeholder: 'Title 2',
                        keepPlaceholderOnFocus: true,
                        onChange: function (newContent) {
                            props.setAttributes({title2: newContent});
                        },
                    }, props.attributes.title2)
                )
            ]
        },


        save: function (props) {
            var attributes = props.attributes;

            return el('div', {
                    className: 'frontend',
                    style: {
                        textAlign: attributes.alignment,
                        backgroundImage: "url('" + attributes.mediaURL + "')"
                    }
                },

                el(RichText.Content, {
                    tagName: 'p',
                    value: attributes.title1,
                    style: {
                        fontSize: attributes.title1FontSize + 'px'
                    }
                }),

                el(RichText.Content, {
                    tagName: 'p',
                    value: attributes.title2
                })
            );
        }
    });

})(
    window.wp.blocks,
    window.wp.editor,
    window.wp.components,
    window.wp.i18n,
    window.wp.element
);