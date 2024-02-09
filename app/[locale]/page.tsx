import { getI18n } from '../../locales/server'

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  console.log("rendering page");

  const t = await getI18n()

  const name = locale === 'en' ? 'John' : 'جون';

  return (
    <div>
      <p>{t('hello')}</p>

      <p>{t('hello.world')}</p>

      <p>{t('welcome', { name: 'John' })}</p>
      <p>{t('welcome', { name: <strong>{name}</strong> })}</p>
    </div>
  )
}
