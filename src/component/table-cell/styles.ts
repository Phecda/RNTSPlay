import { StyleSheet } from 'react-native';
import { STYLE_SIZE, STYLE_COLOR } from '../../variable';

const tableCellStyles = StyleSheet.create({
  container: {
    height: STYLE_SIZE.CELL_NORMAL,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: STYLE_SIZE.SPACING_2,
  },
  dualContainer: {
    height: STYLE_SIZE.CELL_DUAL,
    padding: STYLE_SIZE.SPACING_2,
  },
  title: {
    flex: 1,
    fontSize: STYLE_SIZE.FONT_DYNAMIC_SECTION_HEADER,
    color: STYLE_COLOR.TEXT_MAIN,
  },
  dualTitleContainer: {
    flex: 1,
  },
  dualText: {
    fontSize: STYLE_SIZE.FONT_SECONDARY,
    color: STYLE_COLOR.TEXT_SECONDARY,
  },
  detailText: {
    flex: 1,
    textAlign: 'right',
    fontSize: STYLE_SIZE.FONT_SECONDARY,
    color: STYLE_COLOR.TEXT_SECONDARY,
  },
  seperatorBackground: {
    backgroundColor: STYLE_COLOR.CONTENT_BACKGROUND,
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  seperatorLine: {
    backgroundColor: STYLE_COLOR.SEPERATOR_HEAVY,
    flex: 1,
  },
});

export default tableCellStyles;
