package dev.rooster.ms_docente;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@SpringBootApplication
public class MsDocenteApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsDocenteApplication.class, args);
	}
	@Bean
	public OpenAPI custumOpenAPI() {
		return new OpenAPI().info(new Info()
				.title("OPEN API MICROSERVICIO DOCENTE")
				.version("0.0.1")
				.description("Servicio Web Estudiante")
				.termsOfService("http://swagger.io/terms")
				.license(new License().name("Apahce 2.0").url("http://springdoc.org"))
		);
	}
}
