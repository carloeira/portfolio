// OrbitControls simplificado manualmente
THREE.OrbitControls = function (object, domElement) {
  const scope = this;
  this.object = object;
  this.domElement = domElement;
  this.enabled = true;
  this.autoRotate = true;
  this.autoRotateSpeed = 1.5;
  this.enableZoom = false;

  const spherical = new THREE.Spherical();
  const sphericalDelta = new THREE.Spherical();

  this.update = function () {
    if (scope.autoRotate) {
      sphericalDelta.theta -= 0.01 * scope.autoRotateSpeed;
    }
    spherical.setFromVector3(scope.object.position);
    spherical.theta += sphericalDelta.theta;
    spherical.makeSafe();
    scope.object.position.setFromSpherical(spherical);
    scope.object.lookAt(0, 0, 0);
    sphericalDelta.set(0, 0, 0);
  };
};

// Código do globo
const container = document.getElementById('logo-globe');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const radius = 2;
const logos = [
  'javascript', 'nodejs', 'react', 'angular',
  'sequelize', 'bootstrap', 'tailwindcss', 
  'mysql', 'html5', 'css3', 'spring',
  'git', 'prisma', 'vite', 'java'
];

function createLogoSprite(name, i, total) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;

  img.onload = () => {
    const texture = new THREE.Texture(img);
    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);

    const phi = Math.acos(-1 + (2 * i) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    sprite.position.set(x, y, z);
    sprite.scale.set(0.5, 0.5, 1);
    scene.add(sprite);
  };

  img.onerror = () => {
    console.error(`Erro ao carregar logo: ${name}`);
  };
}

logos.forEach((name, i) => createLogoSprite(name, i, logos.length));

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
