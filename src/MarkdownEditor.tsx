import React, { useState, useEffect, useRef, useMemo, FC } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Markdown, PasteFromMarkdownExperimental } from '@jamesg31/ckeditor5-markdown';
import {
    Underline,
	ClassicEditor,
	Autoformat,
	AutoImage,
	Autosave,
	BalloonToolbar,
	BlockQuote,
	Bold,
	CloudServices,
	Essentials,
	Heading,
	HeadingButtonsUI,
	ParagraphButtonUI,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Link,
	LinkImage,
	List,
	ListProperties,
	Paragraph,
	PasteFromOffice,
	TextTransformation,
	TodoList,
	EventInfo,
	Editor
} from 'ckeditor5';
import { Retool } from '@tryretool/custom-component-support'

import 'ckeditor5/ckeditor5.css';

import './Editor.css';
const LICENSE_KEY = 'GPL';

export const MarkdownEditor: FC = () => {
    Retool.useComponentSettings({
        defaultWidth: 12,
		defaultHeight: 21
    })
	const [value, setValue] = Retool.useStateString({
		name: 'value',
        label: 'Default value'
	})
    const [placeholder, _setPlaceholder] = Retool.useStateString({
        name: 'placeholder',
        label: 'Placeholder',
        initialValue: 'Type or paste your content here!'
    })
	const editorContainerRef = useRef(null);
	const divRef = useRef<HTMLDivElement>(null);
	const editorInstanceRef = useRef<ClassicEditor | null>(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const isInternalChange = useRef(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	useEffect(() => {
		if (!isInternalChange.current && editorInstanceRef.current) {
			const currentContent = editorInstanceRef.current.getData();
			if (currentContent !== value) {
				editorInstanceRef.current.setData(value);
			}
		}
		isInternalChange.current = false;
	}, [value]);

	const onChange = (event: EventInfo, editor: Editor) => {
		isInternalChange.current = true;
		setValue(editor.getData());
	};

	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}

		return {
			editorConfig: {
				toolbar: {
					items: [
						'paragraph',
						'heading1',
						'heading2',
						'heading3',
						'heading4',
						'heading5',
						'heading6',
						'|',
						'bold',
						'underline',
						'|',
						'link',
						'blockQuote',
						'|',
						'bulletedList',
						'numberedList',
						'todoList'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Markdown,
					PasteFromMarkdownExperimental,
					Underline,
					Autoformat,
					AutoImage,
					Autosave,
					BalloonToolbar,
					BlockQuote,
					Bold,
					CloudServices,
					Essentials,
					Heading,
					HeadingButtonsUI,
					ParagraphButtonUI,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					Link,
					LinkImage,
					List,
					ListProperties,
					Paragraph,
					PasteFromOffice,
					TextTransformation,
					TodoList
				],
				balloonToolbar: ['bold', 'underline', '|', 'link', '|', 'bulletedList', 'numberedList'],
				heading: {
					options: [
						{
							model: 'paragraph' as const,
							view: 'p',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1' as const,
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2' as const,
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3' as const,
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4' as const,
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5' as const,
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6' as const,
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				image: {
						toolbar: [
							'toggleImageCaption',
							'imageTextAlternative',
							'|',
							'imageStyle:inline',
							'imageStyle:wrapText',
							'imageStyle:breakText',
							'|',
							'resizeImage'
						]
				},
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual' as const,
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				list: {
					properties: {
						styles: true,
						startIndex: true,
						reversed: true
					}
				},
				placeholder: placeholder,
				ui: {
					poweredBy: {
						position: 'inside' as const,
					}
				},
				markdown: {
					toView: {
						em: 'u'
					},
					toData: {
						u: '_'
					}
				}
			}
		};
	}, [isLayoutReady]);

	return (
		<div className="main-container">
			<div className="editor-container editor-container_classic-editor editor-container_markdown" ref={editorContainerRef}>
				<div className="editor-container__editor">
					<div ref={divRef}>
						{editorConfig && (
							<CKEditor
								editor={ClassicEditor}
								config={editorConfig}
								onChange={onChange}
								onReady={(editor) => {
									editorInstanceRef.current = editor;
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
