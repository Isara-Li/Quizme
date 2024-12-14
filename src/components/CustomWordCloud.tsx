"use client";
import React from 'react'
import D3WordCloud  from 'react-d3-cloud'
import { useTheme } from 'next-themes'

type Props = {}

const fontSizeMapper = (word: { value: number }) =>
    Math.log2(word.value) * 5 + 16;

const data = [
    { text: 'Hey', value: 10 },
    { text: 'Isa', value: 2 },
    {text:'computer', value: 5},
    {text:'programming', value: 5},
    {text:'science', value: 3},]

const CustomWordCloud = (props: Props) => {
    const theme = useTheme()
  return (
    <D3WordCloud
    data={data}
    height={550}
    font="Times"
    fontSize={fontSizeMapper}
    rotate={0}
    padding={10}
    fill={theme.theme === "dark" ? "white" : "black"}/>
  )
}

export default CustomWordCloud