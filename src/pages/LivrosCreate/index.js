import React, { useState } from "react";
// eslint-disable-next-line
import styles from "./styles.css";
import api from "../../services/api";
import UseLoader from "../../hooks/Loader";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ConferenteCreate() {
  const [loader, showLoader, hideLoader] = UseLoader();
  const [titulo, setTitulo] = useState("");
  const { register, handleSubmit, errors } = useForm();

  async function onSubmit() {
    const data = {
      titulo,
    };

    try {
      showLoader();
      await api.post("/livro", data).then(() => {
        console.log("cadastrado");
        hideLoader();
      });
      document.querySelector("form").reset();
    } catch (err) {
      hideLoader();
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-lg-6">
          <h2 className="text-center mb-3 mt-3 titulo-1">Cadastro de livros</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              name="titulo"
              className="form-control"
              onChange={(e) => setTitulo(e.target.value)}
              ref={register({ required: true, minLength: 3, maxLength: 100 })}
            />
            {errors.titulo && errors.titulo.type === "required" && (
              <small className="erro-validacao">
                Esse campo deve ser preenchido
              </small>
            )}
            {errors.titulo && errors.titulo.type === "minLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 3 e 100 caracteres
              </small>
            )}
            {errors.titulo && errors.titulo.type === "maxLength" && (
              <small className="erro-validacao">
                Esse campo deve conter entre 3 e 100 caracteres
              </small>
            )}

            <Row>
              <Col>
                <button type="submit" className="btn-style-1">
                  Cadastrar
                </button>
              </Col>
              <Col>
                <button type="reset" className="btn btn-block btn-secondary">
                  Limpar
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
      {loader}
    </Container>
  );
}
