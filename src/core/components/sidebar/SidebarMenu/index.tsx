import {ListSubheader, alpha, Box, List, styled} from '@mui/material'
import {useLocation, matchPath} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {v4 as uuidv4} from 'uuid'
import {memo} from 'react'
import SidebarMenuItem from './item'
import menuItems from './items'
import {MenuItem} from './SidebarMenuTypes'

const MenuWrapper = styled(Box)(
  ({theme}) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`,
)

const SubMenuWrapper = styled(Box)(
  ({theme}) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.Mui-active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity',
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.Mui-active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`,
)

const renderSidebarMenuItems = ({
  heading,
  items,
  path,
}: {
  heading: string
  items: MenuItem[]
  path: string
}): JSX.Element => (
  <SubMenuWrapper>
    <List component="div">
      {items.reduce(
        (ev, item) => reduceChildRoutes({ev, heading, item, path}),
        [],
      )}
    </List>
  </SubMenuWrapper>
)

const reduceChildRoutes = ({
  ev,
  heading,
  item,
  path,
}: {
  ev: JSX.Element[]
  heading: string
  item: MenuItem
  path: string
}): Array<JSX.Element> => {
  const {t} = useTranslation()
  const name = t('text.capitalize', {value: item.name})
  const slugHeading = t('text.slug', {value: heading})
  const slugName = t('text.slug', {value: item.name})
  const url = heading
    ? `${slugHeading}/${slugName}`
    : item.name === 'home'
    ? '/'
    : slugName

  const exactMatch = item.name
    ? !!matchPath(
        {
          path: url,
          end: true,
        },
        path,
      )
    : false

  if (item.items) {
    const partialMatch = item.name
      ? !!matchPath(
          {
            path: url,
            end: false,
          },
          path,
        )
      : false

    ev.push(
      <SidebarMenuItem
        key={url}
        active={partialMatch}
        open={partialMatch}
        name={name}
        icon={item.icon}
        link={url}
        badge={item.badge}
        badgeTooltip={t(item.badgeTooltip)}>
        {renderSidebarMenuItems({
          path,
          items: item.items,
          heading: `${heading}/${item.name}`,
        })}
      </SidebarMenuItem>,
    )
  } else {
    ev.push(
      <SidebarMenuItem
        key={url}
        active={exactMatch}
        name={name}
        link={url}
        badge={item.badge}
        badgeTooltip={t(item.badgeTooltip)}
        icon={item.icon}
      />,
    )
  }

  return ev
}

const SidebarMenu = ({role}: {role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'}) => {
  const location = useLocation()
  const {t} = useTranslation()

  return (
    <>
      {menuItems.map((menu) => (
        <MenuWrapper key={uuidv4()}>
          <List
            component="div"
            subheader={
              menu.heading === 'management' && role === 'USER' ? null : (
                <ListSubheader component="div" disableSticky>
                  {t(menu.heading)}
                </ListSubheader>
              )
            }>
            {renderSidebarMenuItems({
              heading: menu.heading,
              items: menu.items,
              path: location.pathname,
            })}
          </List>
        </MenuWrapper>
      ))}
    </>
  )
}

export default memo(SidebarMenu)
