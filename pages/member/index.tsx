import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext } from "next";
import OverviewContent from "../../components/organisms/OverviewContent";
import Sidebar from "../../components/organisms/Sidebar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";

export default function Member() {
  return (
    <section className="overview overflow-auto">
      <Sidebar activeMenu="overview" />
      <OverviewContent />
    </section>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const { token } = req.cookies
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      }
    }
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii')
  const payload: JWTPayloadTypes = jwtDecode(jwtToken)
  const userPayload: UserTypes = payload.player
  const IMG = process.env.NEXT_PUBLIC_IMG
  userPayload.avatar = `${IMG}/${userPayload.avatar}`

  return {
    props: {
      user: userPayload
    }
  }
}