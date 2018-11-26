<?php
/*
Plugin Name: Gutenberg Dev Blocks
Author: Vladislav Kobrenko
*/

add_action( 'init', function (){
	wp_register_script( 'gutenberg-dev-blocks-script', plugins_url( 'assets/blocks.js', __FILE__ ), [
		'wp-blocks',
		'wp-components',
		'wp-element',
		'wp-i18n',
		'wp-editor'
	] );

	wp_register_style( 'gutenberg-dev-blocks-style', plugins_url( 'assets/style.css', __FILE__ ), [ 'wp-edit-blocks' ] );

	register_block_type( 'gutenberg-dev-blocks/simple-card', [
		'editor_script' => 'gutenberg-dev-blocks-script',
		'editor_style'  => 'gutenberg-dev-blocks-style',
	] );
} );

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'gutenberg-dev-blocks-style' );
} );