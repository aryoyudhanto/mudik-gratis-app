import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

import Layout from "../components/Layout";
import Button from "../components/Button";
import { WrappingCard } from "../components/Card";
import CustomInput from "../components/CustomInput";

const VerifikasiTiket = () => {
  const [verif, setVerif] = useState<string>("");
  const [cookie, _setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.token) {
      navigate("/");
    }
  }, []);

  function checkTicket(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (verif) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: `No Antri ${verif} terverifikasi`,
        showConfirmButton: true,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi form terlebih dahulu",
      });
    }
  }

  return (
    <Layout>
      <WrappingCard judul="Verifikasi Tiket" titleSet="font-bold">
        <form className="w-full" onSubmit={checkTicket}>
          <div className="px-2 md:px-5 lg:px-10">
            <div className="flex w-full mb-5">
              <div className="flex items-center w-16 md:w-24">
                <p className="font-semibold text-black text-center">No Antri</p>
              </div>
              <CustomInput
                inputSet="text-black w-56 md:w-2/3"
                type="text"
                placeholder="(7 digit angka)"
                onChange={(e) => setVerif(e.target.value)}
              />
            </div>
          </div>
          <Button
            buttonSet="w-1/3 rounded-lg bg-gray-700 font-bold py-3 hover:bg-blue-600 text-white border-0 mt-14"
            label="Cek Tiket"
            type="submit"
          />
        </form>
      </WrappingCard>
    </Layout>
  );
};

export default VerifikasiTiket;
