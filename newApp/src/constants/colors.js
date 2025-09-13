import {Appearance} from 'react-native'

const isDarkTheme = Appearance.getColorScheme() === 'dark'


export const BgBasicColor = isDarkTheme ? '#000000' : '#FFFFFF';      
export const Secondary = isDarkTheme ? '#9B5355' : '#BF616A';         
export const SecondaryLight = isDarkTheme ? '#1E1E1E' : '#F5F7FF';    
export const other = isDarkTheme ? '#CCCCCC' : '#333333';            
export const MainColorLightToo = isDarkTheme ? '#2E2E2E' : '#FEF6FA'; 
export const Primary = isDarkTheme ? '#0A4748' : '#3DC1C9';          
export const Inactive = isDarkTheme ? '#555555' : '#96A7AF';          
export const GoldColor = '#E9E122';                                  
