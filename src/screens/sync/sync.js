import React from 'react'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { MaterialIcons } from '@expo/vector-icons'
import Sentry from 'sentry-expo'
import i18n from 'i18n-js'

import { Layout } from '../../components'
import { ZBox, ZText, ZButton } from '../../components/atomics'
import { DbConsumer, firebaseDb } from '../../db'
import { palette } from '../../config'
import { withToast } from '../../components/toast'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.cyan,
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: { marginLeft: 6, color: palette.white },
})

const SyncButton = ({
  text,
  icon,
  onPress,
  successMessage,
  failureMessage,
  toast,
  ...props
}) => {
  const handlePress = async args => {
    try {
      await onPress(args)
      toast.push({
        message: successMessage,
        type: 'success',
        position: 'bottom',
      })
    } catch (error) {
      Sentry.captureException(error)
      toast.push({ message: failureMessage, position: 'bottom' })
    }
  }

  return (
    <ZButton style={styles.button} onPress={handlePress} {...props}>
      <MaterialIcons name={icon} size={24} color={palette.white} />
      <ZText style={styles.buttonText}>{text}</ZText>
    </ZButton>
  )
}

const ToastedSyncButton = withToast(SyncButton)

class Sync extends React.PureComponent {
  exportDb = data =>
    firebaseDb.ref(`backups/${Constants.installationId}`).set(data)

  restoreDb = setDb => {
    return new Promise((resolve, reject) => {
      const backupRefs = firebaseDb.ref(`backups/${Constants.installationId}`)
      backupRefs.once(
        'value',
        snapshot => {
          const encodedDb = snapshot.val()
          if (encodedDb) {
            setDb(JSON.parse(encodedDb))
          }
          resolve()
        },
        error => reject(error)
      )
    })
  }

  render() {
    return (
      <Layout>
        <ZBox style={styles.container}>
          <DbConsumer>
            {({ db, dbSelectors, setDb }) => {
              const exporting = dbSelectors.getExportableData(db)

              return (
                <>
                  <ToastedSyncButton
                    text={i18n.t('sync.backup.button')}
                    icon="cloud-upload"
                    successMessage={i18n.t('sync.backup.successMessage')}
                    failureMessage={i18n.t('sync.backup.failureMessage')}
                    onPress={() => this.exportDb(exporting.data)}
                  />

                  <ToastedSyncButton
                    text={i18n.t('sync.restore.button')}
                    icon="cloud-download"
                    successMessage={i18n.t('sync.restore.successMessage')}
                    failureMessage={i18n.t('sync.restore.failureMessage')}
                    onPress={() => this.restoreDb(setDb)}
                  />
                </>
              )
            }}
          </DbConsumer>
        </ZBox>
      </Layout>
    )
  }
}

export default Sync
