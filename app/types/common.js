// @flow
import { type ElementType, type ElementRef } from 'react';
import type { ViewStyleProp, TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

export type ViewStyle = ViewStyleProp;
export type TextStyle = TextStyleProp;
export type ImageStyle = ViewStyleProp;

export type ID = string;

type ref = { current: ElementRef<ElementType> | null };
export type Ref = ref | ((ref) => void);
export type Event = Object;
export type AnimatedInterpolation = Object;
export type Node = any;
