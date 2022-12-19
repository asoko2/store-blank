import jwtDecode from "jwt-decode";
import { GetServerSidePropsContext } from "next";
import React from "react";
import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent";
import { JWTPayloadTypes, LatestTransactionTypes, UserTypes } from "../../../services/data-types";
import { getTransactionDetail } from "../../../services/member";

interface TransactionsDetailProps{ 
  transactionDetail: LatestTransactionTypes;
}
export default function TransactionsDetail(props: TransactionsDetailProps) {
  const {transactionDetail } = props
  return (
    <section className="transactions-detail overflow-auto">
      <TransactionDetailContent data={transactionDetail} />
    </section>
  );
}

interface GetServerSideProps extends GetServerSidePropsContext {
  params: {
    idTrx: string;
  }
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { idTrx } = params
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
  const response = await getTransactionDetail(idTrx, jwtToken)

  return {
    props: {
      transactionDetail: response.data
    }
  }
}