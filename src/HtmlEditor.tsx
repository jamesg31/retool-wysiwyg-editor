import React, { useState, useEffect, useRef, useMemo, FC } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
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
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	SourceEditing,
	TextTransformation,
	TodoList,
	Underline,
	EventInfo,
	Editor
} from 'ckeditor5';
import { Retool } from '@tryretool/custom-component-support'

import 'ckeditor5/ckeditor5.css';

import './Editor.css';
const LICENSE_KEY = 'GPL';

export const HtmlEditor: FC = () => {
	Retool.useComponentSettings({
        defaultWidth: 12,
        defaultHeight: 36
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
						'sourceEditing',
						'|',
						'heading',
						'|',
						'bold',
						'italic',
						'underline',
						'|',
						'link',
						'insertImageViaUrl',
						'mediaEmbed',
						'blockQuote',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Autoformat,
					AutoImage,
					Autosave,
					BalloonToolbar,
					BlockQuote,
					Bold,
					CloudServices,
					Essentials,
					Heading,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					ListProperties,
					MediaEmbed,
					Paragraph,
					PasteFromOffice,
					SourceEditing,
					TextTransformation,
					TodoList,
					Underline
				],
				balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
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
				}
			}
		};
	}, [isLayoutReady]);

	return (
		<div className="main-container">
			<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
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
